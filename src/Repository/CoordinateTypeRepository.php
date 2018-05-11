<?php

namespace App\Repository;

use App\Entity\CoordinateType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method CoordinateType|null find($id, $lockMode = null, $lockVersion = null)
 * @method CoordinateType|null findOneBy(array $criteria, array $orderBy = null)
 * @method CoordinateType[]    findAll()
 * @method CoordinateType[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CoordinateTypeRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, CoordinateType::class);
    }

//    /**
//     * @return CoordinateType[] Returns an array of CoordinateType objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CoordinateType
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
