<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Liga;

class LigaController extends Controller
{
    public function show()
    {
        $ligas = Liga::get();
 
        return $ligas->toJson();
    }
}
