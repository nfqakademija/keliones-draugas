<?php

namespace App\Controller;


use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Repository\CoordinateRepository;

class MapController extends Controller
{
     /**
     * @Route("/map")
      */
     public function mapAction(CoordinateRepository $repository)
     {
     	// dump($repository->findAll());
     	// die;


     	return $this->render('map.html.twig');
     }

 }