<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FotosImoveis extends Model
{
    protected $table = 'fotos_imoveis';

    protected $fillable = [
        'id_imovel',
        'endereco',
    ];
}
