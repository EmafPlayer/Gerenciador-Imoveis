<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DespesasAcontecimentos extends Model
{
    protected $table = 'despesas_acontecimentos';

    protected $fillable = [
        'id_despesa',
        'id_acontecimento',
    ];
}
