<?php

namespace App\Repository;

use App\Entity\Coordinate;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\Connection;
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

    public function getCoordinates(float $bottomLeftLat, float $bottomLeftLng, float $topRightLat, float $topRightLng, array $typeIds)
    {
        $query = 'SELECT id, name, address, latitude, longitude
                from coordinate
                where ? <= latitude AND latitude <= ?
                      and ? <= longitude AND longitude <= ?';

        if (!empty($typeIds)) {
            $query .= ' AND coordinate_type_id IN (?)';
        }

        $values = [$bottomLeftLat, $bottomLeftLng, $topRightLat, $topRightLng];
        $types = [\PDO::PARAM_STR, \PDO::PARAM_STR, \PDO::PARAM_STR, \PDO::PARAM_STR];

        if (!empty($typeIds)) {
            $values[] = $typeIds;
            $types[] = Connection::PARAM_INT_ARRAY;
        }

        $stmt = $this->getEntityManager()->getConnection()->executeQuery($query, $values, $types);

        return $stmt->fetchAll();
    }

    public function getTypes(){
        $query = 'select id, type from coordinate_type ORDER BY type ASC;';
        $connection = $this->getEntityManager()->getConnection();
        $statment = $connection->executeQuery($query);
        return $statment->fetchAll();
    }
}