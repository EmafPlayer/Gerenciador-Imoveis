<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TitulosDepesas extends Model
{
    protected $table = 'titulos_despesas';

    protected $fillable = [
        'descricao',
    ];
}
