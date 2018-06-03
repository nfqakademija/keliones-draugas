<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Repository\CoordinateRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class MapCoordinateController extends Controller
{
     /**
      * @Route("/mapcoordinate", condition="request.isXmlHttpRequest()")
      * @Method("GET")
      */
    public function showCoordinateAction(CoordinateRepository $repository, Request $request)
    {
        $bottomLeftLat = $request->query->get('bottom_left_lat');
        $bottomLeftLng = $request->query->get('bottom_left_lng');
        $topRightLat = $request->query->get('top_right_lat');
        $topRightLng = $request->query->get('top_right_lng');
        $typeIds = (array)$request->query->get('type_ids', []);
        if ($bottomLeftLat === null || $bottomLeftLng === null || $topRightLat === null || $topRightLng === null) {
            return new JsonResponse([]);
        }

         return new JsonResponse(
             $repository->getCoordinates(
                 (float)$bottomLeftLat,
                 (float)$topRightLat,
                 (float)$bottomLeftLng,
                 (float)$topRightLng,
                 $typeIds
             )
         );
    }
}
