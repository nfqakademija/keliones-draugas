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

    /**
     * @Assert\Type("float")
     */

    public function getCoordinates($bottomLeftLat, $bottomLeftLng, $topRightLat, $topRightLng){

        $query = "SELECT id, name, address, latitude, longitude
                from coordinate
                where ? <= latitude AND latitude <= ?
                      and ? <= longitude AND longitude <= ?";
        $connection = $this->getEntityManager()->getConnection();
        $stmt = $connection->prepare($query);
        $stmt->bindValue(1, $bottomLeftLat);
        $stmt->bindValue(2, $bottomLeftLng);
        $stmt->bindValue(3, $topRightLat);
        $stmt->bindValue(4, $topRightLng);
        $stmt->execute();
        return $stmt->fetchAll();
    }


}