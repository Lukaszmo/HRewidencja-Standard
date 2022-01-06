<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;


class DefaultController extends AbstractController
{
    /**
     * @Route("/{reactRouting}", name="home", defaults={"reactRouting": null})
     * @Route("/czas-pracy/{reactRouting}", name="czas-pracy")
     * @Route("/urlopy/{reactRouting}", name="urlopy")
     * @Route("/ustawienia/{reactRouting}", name="ustawienia")
     * @Route("/raporty/{reactRouting}", name="raporty")
     * @Route("/panel-admina/{reactRouting}", name="panel-admina")
     */
    public function index()
    {
       return $this->render('base.html.twig');
    } 
}
