<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class HomeController extends Controller
{
    /**
     * @Route("/crud")
     * @Method({"GET"})
     */
    public function indexAction()
    {
        $koordinates = [ 'koord 1', 'koord 2'];
        return $this->render('crud.html.twig',array('koordinates' => $koordinates)
           );
    }

}
