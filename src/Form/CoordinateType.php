<?php

namespace App\Form;

use App\Entity\Coordinate;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CoordinateType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('address')
            ->add('latitude')
            ->add('longitude')
            ->add('coordinateType', EntityType::class, array(
                'class' => \App\Entity\CoordinateType::class,
                'choice_label' => 'type',
            ))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Coordinate::class,
        ]);
    }
}
