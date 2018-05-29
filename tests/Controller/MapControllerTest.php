<?php
/**
 * Created by PhpStorm.
 * User: AI
 * Date: 29/05/2018
 * Time: 18:39
 */


namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;


class MapControllerTest extends WebTestCase
{
    public function testMapAction()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/');

        dump($client->getResponse()->getContent());
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertEquals(1, $crawler->filter('html:contains("Travel mate")')->count());

        $link = $crawler
            ->filter('a:contains("Log In")') // find all links with the text "Greet"
            ->eq(0) // select the second link in the list
            ->link();

        $crawler = $client->click($link);
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertEquals(1, $crawler->filter('html:contains("Please sign in")')->count());
    }
}