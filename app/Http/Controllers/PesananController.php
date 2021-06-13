<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Pesanan;
use App\Models\PesananDetail;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class PesananController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "jumlah_pesanan" => "required"
        ]);

        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
        }

        $product = Product::find($request->product_id);
        
        $total_harga = $request->jumlah_pesanan*$product->harga;
        //Ngecek Apakah user punya data pesanan utama yg status nya 0
        $pesanan = Pesanan::where('user_id', $request->user_id)->where('status',0)->first();

        //Menyimpan / Update Data Pesanan Utama
        if(empty($pesanan))
        {
            Pesanan::create([
                'user_id' => $request->user_id,
                'total_harga' => $total_harga,
                'status' => 0,
                'kode_unik' => mt_rand(100, 999),
            ]);

            $pesanan = Pesanan::where('user_id', $request->user_id)->where('status',0)->first();
            $pesanan->kode_pemesanan = 'JP-'.$pesanan->id;
            $pesanan->update();
        }else {
            $pesanan->total_harga = $pesanan->total_harga+$total_harga;
            $pesanan->update();
        }

        //Meyimpanan Pesanan Detail
        PesananDetail::create([
            'product_id' => $request->product_id,
            'pesanan_id' => $pesanan->id,
            'jumlah_pesanan' => $request->jumlah_pesanan,
            // 'namaset' => $this->nama ? true : false,
            // 'nama' => $this->nama,
            // 'nomor' => $this->nomor,
            'total_harga'=> $total_harga
        ]);

        return $pesanan->toJson();
    }

    public function show($user_id)
    {
        $pesanan = Pesanan::where('user_id','=',$user_id)
                    ->where('status',0)
                    ->first();
        $pesanan_detail = PesananDetail::join('products','products.id','=','pesanan_details.product_id')
                            ->select('pesanan_details.*','products.nama','products.harga','products.jenis','products.harga','products.gambar')
                            ->where('pesanan_details.pesanan_id','=',$pesanan->id)
                            ->get();

        $pesanan['detail'] = $pesanan_detail;
        return $pesanan->toJson();
    }

    public function total_cart($user_id)
    {
        $total_cart = PesananDetail::join('pesanans','pesanans.id','=','pesanan_details.pesanan_id')
                    ->where('pesanans.user_id','=',$user_id)
                    ->where('pesanans.status', 0)
                    ->get();
        $count = $total_cart->count();
 
        return $count;
    }

    public function checkout(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "nohp" => "required",
            "alamat" => "required",
        ]);

        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
        }

        //Simpan nohp Alamat ke data user
        $user = User::where('id', $request->user_id)->first();
        $user->nohp = $request->nohp;
        $user->alamat = $request->alamat;
        $user->update();

        //update data pesanan
        $pesanan = Pesanan::where('user_id', $request->user_id)->where('status', 0)->first();
        $pesanan->status = 1;
        $pesanan->update();

        return $pesanan->toJson();
    }

    public function destroy($id)
    {
       $pesanan_detail = PesananDetail::find($id);
       if(!empty($pesanan_detail)) {
           
           $pesanan = Pesanan::where('id', $pesanan_detail->pesanan_id)->first();
           $jumlah_pesanan_detail = PesananDetail::where('pesanan_id', $pesanan->id)->count();
           if($jumlah_pesanan_detail == 1) 
           {
               $pesanan->delete();
           }else {
               $pesanan->total_harga = $pesanan->total_harga-$pesanan_detail->total_harga;
               $pesanan->update();
           }

           $pesanan_detail->delete();
       }

       return $pesanan_detail;
    }
}
