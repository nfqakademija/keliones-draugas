<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\CoordinateRepository;
use Symfony\Component\HttpFoundation\JsonResponse;

class HomeController extends Controller
{
    /**
     * @Route("/get-types", condition="request.isXmlHttpRequest()")
     */
    public function getCoordinateTypes(CoordinateRepository $repository)
    {
            return new JsonResponse($repository->getTypes());
    }
}
