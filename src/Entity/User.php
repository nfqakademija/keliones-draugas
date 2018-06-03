<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @var Coordinate[]
     * @ORM\OneToMany(targetEntity="App\Entity\Coordinate", mappedBy="coordinateType")
     */
    private $coordinates;

    public function __construct()
    {
        parent::__construct();

        $this->coordinates = new ArrayCollection();

        $this->roles = array('ROLE_USER');
    }
    /**
     * @return array
     */
    public function getRoles(): array
    {
        return $this->roles;
    }

    /**
     * @param array $roles
     */
    public function setRoles(array $roles): void
    {
        $this->roles = $roles;
    }

    public function getId()
    {
        return $this->id;
    }
    /**
     * @return Coordinate[]
     */
    public function getCoordinates()
    {
        return $this->coordinates;
    }

    /**
     * @param Coordinate[] $coordinates
     * @return User
     */
    public function setCoordinates(array $coordinates): User
    {
        $this->coordinates = $coordinates;
        return $this;
    }

    public function addCoordinate(Coordinate $coordinate)
    {
        $this->coordinates->add($coordinate);
        return $this;
    }

    public function removeCoordinate(Coordinate $coordinate)
    {
        $this->coordinates->removeElement($coordinate);
        return $this;
    }
}
