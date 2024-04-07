export function generateSlug(text: string): string{
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '') // replace em tudo que é acento para caractere em branco
        .toLowerCase() 
        .replace(/[^\w\s-]/g, "") // tudp que nao é uma palavra ele tira
        .replace(/\s+/g, '-') //quando sobra mais de um espaço em branco coloca hifen
};

