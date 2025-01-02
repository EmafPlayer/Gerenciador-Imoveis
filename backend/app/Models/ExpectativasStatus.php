<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExpectativasStatus extends Model
{
    protected $table = 'expectativas_status';

    protected $fillable = [
        'id_imovel',
        'tipo_expectativa_status',
    ];
}
