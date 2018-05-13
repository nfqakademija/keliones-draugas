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

    public function getCoordinates(float $bottomLeftLat, float $bottomLeftLng, float $topRightLat, float $topRightLng, array $typeIds){

        $query = "SELECT id, name, address, latitude, longitude
                from coordinate
                where ? <= latitude AND latitude <= ?
                      and ? <= longitude AND longitude <= ?";

        if (!empty($typeIds)) {
            $query .= " AND coordinate_type_id IN (?)";
        }
        $connection = $this->getEntityManager()->getConnection();
        $stmt = $connection->prepare($query);
        $stmt->bindValue(1, $bottomLeftLat);
        $stmt->bindValue(2, $bottomLeftLng);
        $stmt->bindValue(3, $topRightLat);
        $stmt->bindValue(4, $topRightLng);
        if(!empty($typeIds)){
            $stmt->bindValue(5, implode(',', $typeIds));
        }
        $stmt->execute();
        return $stmt->fetchAll();
    }
    public function getCoordinateByType($type){
        $query = "select * from coordinate
                where coordinate_type_id IN (select id from coordinate_type where type IN ($type))";
        $connection = $this->getEntityManager()->getConnection();
        $statment = $connection->executeQuery($query);
        return $statment->fetchAll();
    }

    public function getTypes(){
        $query = 'select id, type from coordinate_type ORDER BY type ASC;';
        $connection = $this->getEntityManager()->getConnection();
        $statment = $connection->executeQuery($query);
        return $statment->fetchAll();
    }
}