<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 * 
 *  normalizationContext={
 *          "groups"="projectUserRel:read"
 *      }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\ProjectUserRelRepository")
 * @ORM\Table(
 *      name="project_user_rel",
 *      uniqueConstraints={@ORM\UniqueConstraint(columns={"project_id", "user_id"})}
 * )
 */
class ProjectUserRel
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"projectUserRel:read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Projects")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"projectUserRel:read"})
     */
    private $project;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"projectUserRel:read"})
     */
    private $user;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"projectUserRel:read"})
     */
    private $active;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProject(): ?Projects
    {
        return $this->project;
    }

    public function setProject(?Projects $project): self
    {
        $this->project = $project;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): self
    {
        $this->active = $active;

        return $this;
    }
}
