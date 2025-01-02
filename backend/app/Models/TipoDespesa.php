<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoDespesa extends Model
{
    protected $table = 'tipo_despesa';

    protected $fillable = [
        'descricao',
    ];
}
