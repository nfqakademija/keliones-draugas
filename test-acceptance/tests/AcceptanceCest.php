<?php
class AcceptanceCest
{
    /**
     * @param AcceptanceTester $I user
     * @throws Exception
     */
    public function _before(AcceptanceTester $I)
    {
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function simple(AcceptanceTester $I)
    {
        $I->amOnPage('/login');
    }
//    public function simple(AcceptanceTester $I)
//    {
//        $I->am("Guest");
//        $I->amOnPage('/');
//        $I->wait(5);
//        $I->canSee('Register');
//        $I->wait(8);
//        $I->click('a[href="/register"]');
//        $I->amRedirectedTo('/register');
//        $I->seeElement('.form-control');
//    }
//        public function register(AcceptanceTester $I)
//    {
//        $I->am("Guest");
//        $I->amOnPage('/');
//        $I->wait(5);
//        $I->see('Register');
//        $I->click('a[href="/register"]');
//        $I->waitForElement('.form-control');
//        $I->fillField('email', 'draugas@test.lt');
//        $I->fillField('username', 'draugas');
//        $I->fillField('paswword', 'draugas');
//        $I->fillField('repeat password', 'draugas');
//        $I->click('input.btn');
//        $I->amRedirectedTo('/register/confirmed');
//        $I->dontSee('Error');
//        $I->canSee('The user has been created successfully');
//    }
}