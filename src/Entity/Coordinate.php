<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CoordinateRepository")
 */
class Coordinate
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
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $latitude;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $longitude;

    /**
     * @ORM\Column(type="boolean")
     */
    private $validated;

    /**
     * @var Thread|null
     * @ORM\OneToOne(targetEntity="App\Entity\Thread")
     * @ORM\JoinColumn(referencedColumnName="id", nullable=true)
     */
    private $thread;


    /**
     * @return boolean
     */
    public function getValidated()
    {
        return $this->validated;
    }

    /**
     * @param mixed $validated
     */
    public function setValidated(bool $validated): void
    {
        $this->validated = $validated;
    }

    /**
     * @var CoordinateType
     * @ORM\ManyToOne(targetEntity="App\Entity\CoordinateType", inversedBy="coordinates")
     * @ORM\JoinColumn(nullable=false)
     */
    private $coordinateType;

    /**
     * @return CoordinateType
     */
    public function getCoordinateType(): ?CoordinateType
    {
        return $this->coordinateType;
    }

    /**
     * @param CoordinateType $coordinateType
     * @return Coordinate
     */
    public function setCoordinateType(CoordinateType $coordinateType): Coordinate
    {
        $this->coordinateType = $coordinateType;
        return $this;
    }


    public function getId()
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getLatitude(): ?string
    {
        return $this->latitude;
    }

    public function setLatitude(string $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(string $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    /**
     * @return Thread|null
     */
    public function getThread(): ?Thread
    {
        return $this->thread;
    }

    /**
     * @param Thread|null $thread
     */
    public function setThread(?Thread $thread): void
    {
        $this->thread = $thread;
    }
}
