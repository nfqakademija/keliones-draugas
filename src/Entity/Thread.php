<?php
/**
 * Created by PhpStorm.
 * User: ubuntu
 * Date: 18.5.13
 * Time: 15.27
 */

namespace App\Entity;


use Doctrine\ORM\Mapping as ORM;
use FOS\CommentBundle\Entity\Thread as BaseThread;

/**
 * @ORM\Entity
 */
class Thread extends BaseThread
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    protected $id;


}