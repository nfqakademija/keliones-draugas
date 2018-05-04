<?php

namespace App\Repository;

use App\Entity\Coordinate;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Coordinate|null find($id, $lockMode = null, $lockVersion = null)
 * @method Coordinate|null findOneBy(array $criteria, array $orderBy = null)
 * @method Coordinate[]    findAll()
 * @method Coordinate[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CoordinateRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Coordinate::class);

    }

    public function getCoordinates($bottomLeftLat, $bottomLeftLng, $topRightLat, $topRightLng){

        $query = "SELECT id, name, address, latitude, longitude
                from coordinate
                where $bottomLeftLat <= latitude AND latitude <= $bottomLeftLng
                      and  $topRightLat <= longitude AND longitude <= $topRightLng;";
        $connection = $this->getEntityManager()->getConnection();
        $statment = $connection->executeQuery($query);
        return $statment->fetchAll();
    }
}