<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Repository\CoordinateRepository;
use Symfony\Component\HttpFoundation\JsonResponse;

class HomeController extends Controller
{
    /**
     * @Route("/get-types", condition="request.isXmlHttpRequest()")
     * @Method("GET")
     */
    public function getCoordinateTypes(CoordinateRepository $repository)
    {
            return new JsonResponse($repository->getTypes());
    }
}
