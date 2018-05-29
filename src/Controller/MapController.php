<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Repository\CoordinateRepository;

class MapController extends Controller
{
     /**
     * @Route("/")
      */
    public function mapAction(CoordinateRepository $repository)
    {
        return $this->render('map.html.twig');
    }
}
