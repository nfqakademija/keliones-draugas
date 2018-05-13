<?php

namespace App\Controller;

use App\Entity\Coordinate;
use App\Form\CoordinateType;
use App\Repository\CoordinateRepository;
use Doctrine\ORM\EntityManager;
use FOS\CommentBundle\Entity\ThreadManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/coordinate")
 */
class CoordinateController extends Controller
{
    /**
     * @Route("/", name="coordinate_index", methods="GET")
     */
    public function index(CoordinateRepository $coordinateRepository): Response
    {
        return $this->render('coordinate/index.html.twig', ['coordinates' => $coordinateRepository->findAll()]);
    }

    /**
     * @Route("/new", name="coordinate_new", methods="GET|POST")
     */
    public function new(Request $request): Response
    {
        $coordinate = new Coordinate();
        $form = $this->createForm(CoordinateType::class, $coordinate);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($coordinate);
            $em->flush();

            return $this->redirectToRoute('coordinate_index');
        }

        return $this->render('coordinate/new.html.twig', [
            'coordinate' => $coordinate,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="coordinate_show", methods="GET")
     */
    public function show(Coordinate $coordinate, Request $request): Response
    {
        if($coordinate->getThread() === null)
        {
            $threadManager = $this->get('fos_comment.manager.thread');
            $thread = $threadManager->createThread();
            $thread->setId($coordinate->getId());
            $thread->setPermalink($request->getUri());

            // Add the thread
            $threadManager->saveThread($thread);
            $coordinate->setThread($thread);
            $this->get('doctrine.orm.default_entity_manager')->flush();
        }
        return $this->render('coordinate/show.html.twig', ['coordinate' => $coordinate]);
    }

    /**
     * @Route("/{id}/edit", name="coordinate_edit", methods="GET|POST")
     */
    public function edit(Request $request, Coordinate $coordinate): Response
    {
        $form = $this->createForm(CoordinateType::class, $coordinate);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('coordinate_edit', ['id' => $coordinate->getId()]);
        }

        return $this->render('coordinate/edit.html.twig', [
            'coordinate' => $coordinate,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="coordinate_delete", methods="DELETE")
     */
    public function delete(Request $request, Coordinate $coordinate): Response
    {
        if ($this->isCsrfTokenValid('delete'.$coordinate->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($coordinate);
            $em->flush();
        }

        return $this->redirectToRoute('coordinate_index');
    }
}
