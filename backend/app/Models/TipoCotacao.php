<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoCotacao extends Model
{
    protected $table = 'tipo_cotacao';

    protected $fillable = [
        'descricao',
    ];
}
