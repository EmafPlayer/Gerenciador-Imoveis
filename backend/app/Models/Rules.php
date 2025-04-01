<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rules extends Model
{
    protected $table = "rules";

    protected $fillable = [
        "descricao"
    ];

}
