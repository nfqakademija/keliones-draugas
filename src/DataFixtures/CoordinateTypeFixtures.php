<?php
/**
 * Created by PhpStorm.
 * User: AI
 * Date: 22/04/2018
 * Time: 18:04
 */

namespace App\DataFixtures;


use App\Entity\CoordinateType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class CoordinateTypeFixtures extends Fixture
{

    public function load(ObjectManager $manager)
    {
        $coordinateType = new CoordinateType();
        $coordinateType->setType("electric cars");

        $this->addReference('ecectric_cars', $coordinateType);

        $manager->persist($coordinateType);
        $manager->flush();
    }
}