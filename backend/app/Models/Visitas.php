<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visitas extends Model
{
    protected $table = 'visitas';

    protected $fillable = [
        'id_imovel',
        'id_corretor',
        'data_visita',
        'proposta',
        'valor_proposta',
        'data_proposta',
        'descricao',
    ];
}
