<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Imoveis extends Model
{
    protected $table = 'imoveis';

    protected $fillable = [
        'nome',
        'id_endereco',
        'descricao',
        'anunciado',
        'fornecimento_agua',
        'fornecimento_luz',
        'cadastro_iptu',
        'matricula',
        'cartorio_registro',
        'area',
        'area_testada',
        'fracao_ideal',
        'area_total',
        'area_construida',
        'id_tipo_imovel',
    ];
}
