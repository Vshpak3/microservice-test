<?php

namespace Tests\Feature;

use Laravel\Lumen\Testing\DatabaseMigrations;
use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use Tymon\JWTAuth\Facades\JWTAuth;

class PostControllerTest extends TestCase
{
    use DatabaseMigrations;

    protected $user;
    protected $token;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
        $this->user = User::factory()->create();
        $this->token = JWTAuth::fromUser($this->user);
    }

    public function test_create_post()
    {
        $response = $this->post('/api/posts', [
            'title' => 'Test Post',
            'content' => 'This is a test post.',
        ], [
            'Authorization' => "Bearer {$this->token}",
        ]);

        $response->seeStatusCode(201)
            ->seeJsonContains(['title' => 'Test Post']);
    }

    public function test_get_all_posts()
    {
        Post::factory()->create(['user_id' => $this->user->id]);

        $response = $this->get('/api/posts', [
            'Authorization' => "Bearer {$this->token}",
        ]);

        $response->seeStatusCode(200)
            ->seeJsonStructure([['id', 'title', 'content']]);
    }
}
