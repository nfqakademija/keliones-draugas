<?php

namespace App\Controller;

use App\Entity\CoordinateType;
use App\Form\CoordinateType1Type;
use App\Repository\CoordinateTypeRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/coordinate-type")
 * @Security("has_role('ROLE_ADMIN')")
 */
class CoordinateTypeController extends Controller
{
    /**
     * @Route("/", name="coordinate_type_index", methods="GET")
     * @Method("GET")
     */
    public function index(CoordinateTypeRepository $coordinateTypeRepository): Response
    {
        return $this->render(
            'coordinate_type/index.html.twig',
            ['coordinate_types' => $coordinateTypeRepository->findAll()]
        );
    }

    /**
     * @Route("/new", name="coordinate_type_new")
     * @Method({"GET", "POST"})
     */
    public function new(Request $request): Response
    {
        $coordinateType = new CoordinateType();
        $form = $this->createForm(CoordinateType1Type::class, $coordinateType);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($coordinateType);
            $em->flush();

            return $this->redirectToRoute('coordinate_type_index');
        }

        return $this->render('coordinate_type/new.html.twig', [
            'coordinate_type' => $coordinateType,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="coordinate_type_show")
     * @Method("GET")
     */
    public function show(CoordinateType $coordinateType): Response
    {
        return $this->render('coordinate_type/show.html.twig', ['coordinate_type' => $coordinateType]);
    }

    /**
     * @Route("/{id}/edit", name="coordinate_type_edit")
     * @Method({"GET", "POST"})
     */
    public function edit(Request $request, CoordinateType $coordinateType): Response
    {
        $form = $this->createForm(CoordinateType1Type::class, $coordinateType);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('coordinate_type_edit', ['id' => $coordinateType->getId()]);
        }

        return $this->render('coordinate_type/edit.html.twig', [
            'coordinate_type' => $coordinateType,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="coordinate_type_delete")
     * @Method("DELETE")
     */
    public function delete(Request $request, CoordinateType $coordinateType): Response
    {
        if ($this->isCsrfTokenValid('delete'.$coordinateType->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($coordinateType);
            $em->flush();
        }

        return $this->redirectToRoute('coordinate_type_index');
    }
}
