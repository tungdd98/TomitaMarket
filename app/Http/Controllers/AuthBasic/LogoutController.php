<?php

namespace App\Http\Controllers\AuthBasic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function __invoke() {
        auth()->logout();
    }
}
