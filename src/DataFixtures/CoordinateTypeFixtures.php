<?php
/**
 * Created by PhpStorm.
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

        $coordinateType = new CoordinateType();
        $coordinateType->setType("public");
        $this->addReference('public', $coordinateType);

        $manager->persist($coordinateType);
        $manager->flush();
    }
}