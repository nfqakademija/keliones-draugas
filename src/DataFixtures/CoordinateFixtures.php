<?php

namespace App\DataFixtures;

use App\Entity\Coordinate;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class CoordinateFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $coordinate = new Coordinate();
        $coordinate->setName('Pupa-2');
        $coordinate->setAddress('Priegliaus g. 1, Vilnius 06269');
        $coordinate->setLatitude('54.7098987');
        $coordinate->setLongitude('25.1851605');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('2BH IKI Seskine1');
        $coordinate->setAddress('Šeškinės g. 32, Vilnius 07157');
        $coordinate->setLatitude('54.7155273');
        $coordinate->setLongitude('25.2432311');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('NORFA Parodu-2');
        $coordinate->setAddress('Parodų g. 1A, 04215 Vilnius');
        $coordinate->setLatitude('54.6734191');
        $coordinate->setLongitude('25.2219382');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('4BH IKI Mada1');
        $coordinate->setAddress('Viršuliškių g. 40, Vilnius 05112');
        $coordinate->setLatitude('54.708046');
        $coordinate->setLongitude('25.2254403');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('NORFA Parodu-2');
        $coordinate->setAddress('Parodų g. 1A, 04215 Vilnius');
        $coordinate->setLatitude('54.6734191');
        $coordinate->setLongitude('25.2219382');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('Crown Plaza-1');
        $coordinate->setAddress('KM. K. Čiurlionio 84, Vilnius 03100');
        $coordinate->setLatitude('54.6818721');
        $coordinate->setLongitude('25.2484853');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('Quadrum-2');
        $coordinate->setAddress('Konstitucijos pr. 21, 08130 Vilnius');
        $coordinate->setLatitude('54.6981808');
        $coordinate->setLongitude('25.2687508');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('RIMI Savanoriai-4');
        $coordinate->setAddress('Kedrų g. 4, Vilnius 03116');
        $coordinate->setLatitude('54.675484');
        $coordinate->setLongitude('25.2546494');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('IKI Mindaugo-2');
        $coordinate->setAddress('Mindaugo g. 25, Vilnius 03214');
        $coordinate->setLatitude('54.6732299');
        $coordinate->setLongitude('25.2724761');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('Green Hall-2');
        $coordinate->setAddress('Upės g. 21, 08128 Vilnius');
        $coordinate->setLatitude('54.695601');
        $coordinate->setLongitude('25.2576826');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('K29-4');
        $coordinate->setAddress('Konstitucijos pr. 29, Vilnius 08105');
        $coordinate->setLatitude('54.6995679');
        $coordinate->setLongitude('25.226166');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('Žalgirio 135-1');
        $coordinate->setAddress('Žalgirio g. 135, 08217 Vilnius');
        $coordinate->setLatitude('54.7048838');
        $coordinate->setLongitude('25.2694691');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('VC City-1');
        $coordinate->setAddress('Žalgirio g. 90, 09303 Vilnius');
        $coordinate->setLatitude('54.703708');
        $coordinate->setLongitude('25.2759581');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('RIMI Jeruzale-1');
        $coordinate->setAddress('Jeruzalės g. 4, Vilnius 08420');
        $coordinate->setLatitude('54.7401342');
        $coordinate->setLongitude('25.272418');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('RIMI Žirmūnai-1');
        $coordinate->setAddress('Žirmūnų g. 64, Vilnius 09131');
        $coordinate->setLatitude('54.7123504');
        $coordinate->setLongitude('25.2999408');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('1BH IKI Didlaukio');
        $coordinate->setAddress('Didlaukio g. 80A, Vilnius 08326');
        $coordinate->setLatitude('54.7288717');
        $coordinate->setLongitude('25.2671024');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('Technopolis-1');
        $coordinate->setAddress('Juozo Balčikonio g. 3, 08247 Vilnius');
        $coordinate->setLatitude('54.7194348');
        $coordinate->setLongitude('25.2817066');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('IKI Antakalnis-2');
        $coordinate->setAddress('Nemenčinės pl. 2, Vilnius 10103');
        $coordinate->setLatitude('54.724224');
        $coordinate->setLongitude('25.3177139');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('3BH IKI Sauletekis');
        $coordinate->setAddress('Saulėtekio al. 43, Vilnius 10227');
        $coordinate->setLatitude('54.7221331');
        $coordinate->setLongitude('25.342193');
        $coordinate->setValidated(false);
        $coordinate->setCoordinateType($this->getReference('ecectric_cars'));

        $manager->persist($coordinate);

        //public

        $coordinate = new Coordinate();
        $coordinate->setName('Caffeine LT');
        $coordinate->setAddress('Vilniaus g. 31, Vilnius 01102');
        $coordinate->setLatitude('54.6671223');
        $coordinate->setLongitude('25.2214263');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('public'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('Caffeine LT');
        $coordinate->setAddress('Vilniaus g. 17, Vilnius 01402');
        $coordinate->setLatitude('54.6865426');
        $coordinate->setLongitude('25.2771111');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('public'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('Caffeine LT');
        $coordinate->setAddress('Pilies g. 3, Vilnius 01123');
        $coordinate->setLatitude('54.6671223');
        $coordinate->setLongitude('25.2214263');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('public'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('Caffeine LT');
        $coordinate->setAddress('Gedimino pr. 52, Vilnius 01110');
        $coordinate->setLatitude('54.6893834');
        $coordinate->setLongitude('25.2635775');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('public'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('Kačių Kavinė');
        $coordinate->setAddress('J. Jasinskio g. 1, Vilnius 01111');
        $coordinate->setLatitude('54.6878831');
        $coordinate->setLongitude('25.2654022');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('public'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('Chaika');
        $coordinate->setAddress('Totorių g. 7, Vilnius 01121');
        $coordinate->setLatitude('54.6852752');
        $coordinate->setLongitude('25.2797805');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('public'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('"BREW" Kavos virėjai');
        $coordinate->setAddress('Pylimo g. 19, Vilnius 01141');
        $coordinate->setLatitude('54.6795571');
        $coordinate->setLongitude('25.2771987');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('public'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('Caffeine LT');
        $coordinate->setAddress('Saltoniškių g. 9, Vilnius 08105');
        $coordinate->setLatitude('54.6999129');
        $coordinate->setLongitude('25.256889');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('public'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('Huracán Coffee');
        $coordinate->setAddress('Saltoniškių g. 9, Vilnius 08105');
        $coordinate->setLatitude('54.6881343');
        $coordinate->setLongitude('25.2520652');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('public'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('Huracán Coffee');
        $coordinate->setAddress('Vokiečių g. 15, Vilnius 01130');
        $coordinate->setLatitude('54.6873405');
        $coordinate->setLongitude('25.2679439');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('public'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('Lietuvos Nacionalinė Martyno Mažvydo Biblioteka');
        $coordinate->setAddress('Gedimino pr. 51, Vilnius 01504');
        $coordinate->setLatitude('54.6873876');
        $coordinate->setLongitude('25.2679438');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('public'));

        $manager->persist($coordinate);

        $coordinate = new Coordinate();
        $coordinate->setName('Vero Cafe');
        $coordinate->setAddress('Ozo 18, Vilnius lt-08243');
        $coordinate->setLatitude('54.7142568');
        $coordinate->setLongitude('25.2732653');
        $coordinate->setValidated(true);
        $coordinate->setCoordinateType($this->getReference('public'));

        $manager->persist($coordinate);



        $manager->flush();
    }

    function getDependencies()
    {
        return array(
            CoordinateTypeFixtures::class,
        );
    }
}