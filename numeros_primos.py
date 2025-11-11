def es_primo(numero):
    """
    Verifica si un número es primo.
    Un número primo es mayor que 1 y solo es divisible por 1 y por sí mismo.
    """
    if numero < 2:
        return False
    
    # Verificar divisibilidad desde 2 hasta la raíz cuadrada del número
    for i in range(2, int(numero ** 0.5) + 1):
        if numero % i == 0:
            return False
    return True


def mostrar_primos(limite):
    """
    Muestra todos los números primos desde 0 hasta el límite especificado.
    """
    primos = []
    for numero in range(2, limite + 1):
        if es_primo(numero):
            primos.append(numero)
    
    return primos


def main():
    """
    Función principal que solicita al usuario un número y muestra los primos.
    """
    print("=" * 50)
    print("Generador de Números Primos")
    print("=" * 50)
    
    try:
        limite = int(input("Ingrese un número límite: "))
        
        if limite < 2:
            print("\nNo hay números primos menores que 2.")
            return
        
        primos = mostrar_primos(limite)
        
        print(f"\nNúmeros primos desde 0 hasta {limite}:")
        print("-" * 50)
        
        if primos:
            # Mostrar los primos en una línea separados por comas
            print(", ".join(map(str, primos)))
            print(f"\nTotal de números primos encontrados: {len(primos)}")
        else:
            print("No se encontraron números primos en el rango especificado.")
            
    except ValueError:
        print("\nError: Por favor ingrese un número entero válido.")
    except KeyboardInterrupt:
        print("\n\nPrograma interrumpido por el usuario.")


if __name__ == "__main__":
    main()

