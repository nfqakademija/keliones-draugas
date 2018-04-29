<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $newUser = new User();
        $newUser->setUsername("admin");
        $newUser->setEmail("admin@admin.lt");
        $newUser->setPlainPassword("admin");
        $newUser->setRoles(array('ROLE_ADMIN'));

        $manager->persist($newUser);

        $newUser = new User();
        $newUser->setUsername("user");
        $newUser->setEmail("user@user.lt");
        $newUser->setPlainPassword("user");
        $newUser->setRoles(array('ROLE_USER'));

        $manager->persist($newUser);
        $manager->flush();
    }
}