<?php

namespace App\Controller;


use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Repository\CoordinateRepository;
use Symfony\Component\HttpFoundation\JsonResponse;

class CoordinateController extends Controller
{
     /**
     * @Route("/coordinate")
      */

     public function showCoordinateAction(CoordinateRepository $repository)
     {

     	// dump($repository->findAll());
     	// die;

        $coordArray = array();
        foreach ($repository->findAll() as $coordinate) {
            $tempArray = array(
                'name' => $coordinate->getName(),
                'address' => $coordinate->getAddress(),
                'latitude' => $coordinate->getLatitude(),
                'longitude' => $coordinate->getLongitude(),
                );
            array_push($coordArray, $tempArray);

        }
        // dump($coordArray);
        return new JsonResponse($coordArray);
        return $this->render('coordinate.html.twig');   	
    }

}