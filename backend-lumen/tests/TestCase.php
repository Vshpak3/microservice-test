<?php

namespace Tests;

use Laravel\Lumen\Testing\TestCase as BaseTestCase;
use Database\Factories\UserFactory;
use Database\Factories\PostFactory;

abstract class TestCase extends BaseTestCase
{
    /**
     * Creates the application.
     *
     * @return \Laravel\Lumen\Application
     */
    public function createApplication()
    {
        return require __DIR__ . '/../bootstrap/app.php';
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->artisan('migrate');

        require_once base_path('database/factories/UserFactory.php');
        require_once base_path('database/factories/PostFactory.php');
    }
}
