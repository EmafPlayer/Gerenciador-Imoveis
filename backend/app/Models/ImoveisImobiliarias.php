<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImoveisImobiliarias extends Model
{
    protected $table = 'imoveis_imobiliarias';

    protected $fillable = [
        'id_imovel',
        'id_imobiliaria',
    ];
}
