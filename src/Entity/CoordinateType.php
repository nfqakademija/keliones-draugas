<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CoordinateTypeRepository")
 */
class CoordinateType
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $type;

    /**
     * @var Coordinate[]
     * @ORM\OneToMany(targetEntity="App\Entity\Coordinate", mappedBy="coordinateType")
     */
    private $coordinates;

    public function __construct()
    {
        $this->coordinates = new ArrayCollection();
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
     * @return CoordinateType
     */
    public function setCoordinates(array $coordinates): CoordinateType
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

    public function getId()
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }
}
