<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatusAcontecimento extends Model
{
    protected $table = 'status_acontecimento';

    protected $fillable = [
        'descricao',
    ];
}
