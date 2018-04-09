<?php

namespace App\DataFixtures;

use App\Entity\Coordinate;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class CoordinateFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // create 20 products! Bam!
        
            $coordinate = new Coordinate();
            $coordinate->setName('DOMUS Pro-2');
            $coordinate->setAddress('Bieliūnų g. Vilnius 12110');
            $coordinate->setLatitude('54.739160');
            $coordinate->setLongitude('25.226166');
        
        $manager->persist($coordinate);
        $manager->flush();
    }
}