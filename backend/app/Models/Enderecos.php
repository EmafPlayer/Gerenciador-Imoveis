<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enderecos extends Model
{
    protected $table = 'enderecos';

    protected $fillable = [
        'rua',
        'numero',
        'bairro',
        'cidade',
        'estado',
        'complemento',
    ];
}
