import java.util.Scanner;

public class Chi_Cuadrada{
    
    static Scanner sc=new Scanner(System.in);
    static float menor=1;
    static float mayor=0;
    static int k;
    static float r;
    static float w;
    static float e;
    static int o=0;
    static float [] intervalos;
    static float [] randoms;
    static float suma=0;

    static void GenerarTablaAleatoria(int n){
        float rnd;
        for(int i=0; i<n; i++){
            rnd=(float)Math.random();
            if(rnd<menor){
                menor=rnd;
            }
            if(rnd>mayor){
                mayor=rnd;
            }
            randoms[i]=rnd;
            System.out.format("%1s %20s", i+1, randoms[i] + "\n");
        }
        System.out.println();
    }

    static void generaIntervalos(float arr []){
        arr[0]=menor + w;
        for(int i=1; i<arr.length; i++){
            arr[i] = arr[i-1] + w;
        }
    }

    static void chiCuadrada(float arr[], float rnd[]){
        System.out.format("%1s %15s %15s %15s %15s", "i", "o", "e", "(o-e)", "((o-e)^2)/e\n");
        for(int i=0; i<rnd.length; i++){
            if(rnd[i]>=menor && rnd[i]<arr[0]){
                o++;
            }
        }
        suma+=(((o-e)*(o-e))/e);
        System.out.format("%1s %15s %15s %15s %15s", 1, o, e, (o-e), (((o-e)*(o-e))/e) + "\n");
        o=0;
        for(int i=1; i<arr.length; i++){
            for(int j=0; j<rnd.length; j++){
                if(rnd[j]>=arr[i-1] && rnd[j]<arr[i]){
                    o++;
                }
            }
            suma+=(((o-e)*(o-e))/e);
            System.out.format("%1s %15s %15s %15s %15s", i+1, o, e, (o-e), (((o-e)*(o-e))/e) + "\n");
            o=0;
        }
        System.out.println("La suma de ((o-e)^2)/e = " + suma);
    }

    public static void main(String[] args) {
        System.out.println("Ingrese el valor de n:");
        int n=sc.nextInt();
        randoms=new float[n];
        k=(int) Math.sqrt(n);
        e=n/k;
        GenerarTablaAleatoria(n);
        intervalos=new float[k];
        r=mayor-menor;
        w=r/k;
        generaIntervalos(intervalos);
        chiCuadrada(intervalos, randoms);
        
    }
}
