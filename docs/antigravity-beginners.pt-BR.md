# Modo de uso para iniciantes: o toolkit no Antigravity

Este guia é para quem **não programa, ou programa pouco**, e quer usar o toolkit nos próprios projetos dentro do Google Antigravity. Ele explica cada passo, as palavras difíceis e o que fazer quando algo foge do esperado. Está em português de propósito; os demais documentos do repositório estão em inglês.

Os detalhes técnicos (caminhos de pastas, formatos de arquivo) estão no [guia técnico do Antigravity](tools/23-antigravity-workflow.md). Os textos que você vai colar no agente estão no [prompt 15](prompts/15-antigravity-existing-project-setup.md). Aqui está o "como usar" na prática.

## 1. O que isso faz, em um minuto

O toolkit é um **livro de receitas**: arquivos de texto que ensinam o agente (a IA do Antigravity) a preparar o seu projeto. Ele organiza as instruções e a documentação, liga ferramentas úteis e confere a qualidade do código.

- **Você** é o chefe: decide e aprova.
- **O agente** é o cozinheiro: lê a receita e faz o trabalho.
- **Cada Etapa** é um prato, e você aprova um de cada vez.

**O que ele não faz:** não cria um app do zero, não publica nada na internet, não troca a tecnologia do seu projeto e não garante que o código não tenha defeitos.

## 2. Antes de começar (lista de conferência)

- [ ] Antigravity instalado (site oficial: antigravity.google) e login com sua conta Google.
- [ ] O toolkit completo no seu computador (passo 3 abaixo).
- [ ] Uma **cópia** do seu projeto (passo 4).
- [ ] Saber qual pasta é a raiz do projeto (passo 5).
- [ ] Ninguém cola senha ou chave de acesso no chat. Nunca.

## 3. Preparar o toolkit (só uma vez)

1. Baixe o toolkit já com as mudanças do Antigravity e descompacte numa pasta fácil, por exemplo `C:\Users\SeuNome\Documents\vibe-coding-toolkit-main`. No Mac ou Linux, algo como `~/Documents/vibe-coding-toolkit-main`.
2. Se o Windows perguntar sobre arquivos que já existem, escolha **Substituir os arquivos no destino**.
3. **Confira se estes três arquivos existem:**
   - `docs\tools\23-antigravity-workflow.md`
   - `docs\prompts\15-antigravity-existing-project-setup.md`
   - `templates\project\antigravity.mcp_config.json.example`

Se faltar algum, a extração ficou incompleta: descompacte de novo, por cima, na pasta que contém `docs` e `templates`. Sem esses arquivos, o agente não encontra as receitas.

## 4. Proteger o seu projeto

Copie a pasta inteira do projeto (botão direito, copiar e colar) e acrescente `-COPIA` ao nome. **Use só a cópia nas primeiras vezes.** O agente vai criar e alterar vários arquivos, e a cópia permite voltar atrás.

**A cópia protege os arquivos, mas não protege serviços na nuvem.** Se o seu projeto usa um banco de dados ou serviço online (Supabase, Firebase etc.), o agente pode ter acesso a ele por chaves guardadas no projeto (arquivo `.env`) ou por ferramentas já conectadas no Antigravity. Por isso a mensagem padrão do passo 6 proíbe escrever nesses serviços.

## 5. Abrir o projeto certo no Antigravity

No Antigravity, abra a **pasta do seu projeto** (não a do toolkit). Qual pasta? A que contém o arquivo principal do projeto: em projetos de site e aplicativo costuma ser a que tem o arquivo `package.json`. Se o seu projeto estiver dentro de outra pasta (por exemplo `MinhaPasta\MeuApp`), abra a interna, `MeuApp`.

No painel de conversa do agente há um seletor de modelo e, em alguns modelos, um nível de raciocínio (Baixo, Médio, Alto). Para a Etapa 1, use o nível alto. Para as Etapas 2 e 5, um modelo leve costuma servir. Se for mexer em código (Etapa 4), prefira um modelo mais forte.

## 6. A mensagem padrão (copiar e colar)

Troque `CAMINHO_DO_TOOLKIT` pelo caminho da pasta do passo 3 e `N` pelo número da etapa. **Se o caminho tiver espaços, mantenha as aspas.**

```text
Leia o arquivo "CAMINHO_DO_TOOLKIT\docs\prompts\15-antigravity-existing-project-setup.md" e execute somente o bloco da Etapa N neste projeto. A cópia local do toolkit está em "CAMINHO_DO_TOOLKIT". Converse comigo em português e explique em linguagem simples.

Regras: não envie nada para a internet (sem git push, sem publicar). Não instale nada no computador inteiro (global) sem me perguntar antes. Não altere banco de dados real nem use ferramentas conectadas a serviços reais, como o Supabase, para gravar dados. Se precisar de senha ou chave, peça que eu coloque no arquivo .env; nunca me peça para colar no chat. Ao final, liste os arquivos que você criou ou alterou e pare.
```

Na Etapa 1, acrescente: `Não altere nenhum arquivo.`

Se o agente reclamar que não consegue ler fora da pasta do projeto, libere o acesso **só à pasta do toolkit**. Se mesmo assim não ler, copie o toolkit para uma subpasta `_toolkit` dentro do projeto, use e apague depois.

## 7. As cinco etapas

Mande **uma etapa por mensagem**. Leia o resultado inteiro antes de responder "Aprovado" e seguir para a próxima.

| Etapa | O que faz, em português simples | Mexe no seu projeto? | Pode pular? |
|---|---|---|---|
| 1. Diagnóstico | Olha o projeto, roda verificações seguras e propõe um plano | Não | Não |
| 2. Instruções e documentação | Cria o arquivo `AGENTS.md` (as regras do projeto para o agente) e a documentação em `docs/` | Cria arquivos | Não |
| 3. Ferramentas | Liga o Context7 (consulta de documentação atualizada) e organiza skills; RTK e Graphify são opcionais | Cria configuração | Em parte |
| 4. Qualidade | Corrige avisos e melhora o código | **Sim, no código** | Sim |
| 5. Validação | Testa tudo, revisa e escreve o relatório final | Pouco | Não |

**O mínimo recomendado para começar são as Etapas 1 e 2.** Elas dão o maior ganho: o agente passa a conhecer o seu projeto e a seguir as suas regras. Use por alguns dias e só depois decida sobre as outras.

**Continuidade:** na Etapa 1, o plano fica só na conversa, então fique na mesma conversa até terminar a Etapa 2. Depois dela existe o arquivo `docs/setup.md`, e você pode abrir uma conversa nova dizendo: "Continue a partir do docs/setup.md".

## 8. Como ler o relatório da Etapa 1

| Palavra no relatório | O que significa |
|---|---|
| Lint | Corretor automático de estilo. "Aviso" é sugestão; "erro" é problema que precisa de correção |
| Tipos (TypeScript) | Verificação de que os dados do código combinam entre si |
| Build | Montar o projeto como ele iria para a internet. Se passa, o projeto compila |
| Testes | Programas que conferem se o sistema funciona. Muitos projetos de iniciante não têm |
| Git | Histórico de versões do projeto, com pontos de restauração |
| AGENTS.md | Arquivo com as regras do projeto, lido pelo agente toda vez |
| Skill | Um "manual" que o agente carrega para uma tarefa específica |
| MCP | Uma conexão entre o agente e um serviço externo (banco, documentação, navegador) |
| Context7 | Serviço que entrega ao agente a documentação atual de bibliotecas |
| RTK, Graphify | Programas opcionais: um encurta a saída de comandos, o outro faz um mapa do código |
| Matriz de cobertura | A tabela com todas as ferramentas do toolkit e a decisão sobre cada uma |
| N/A (não se aplica) | Aquela ferramenta não serve para o seu projeto, e isso é normal |
| "Reutilizado por equivalente" | Você já tem algo que cumpre o mesmo papel |

A tabela grande do relatório tem muitas linhas "não se aplica". Isso não é falha: o toolkit é largo de propósito, e o agente só deve mexer no que faz sentido para o seu projeto.

## 9. Situações comuns e o que responder

Estas aparecem com frequência na Etapa 1. O agente costuma perguntar sobre elas no fim do relatório.

| Situação | O que responder |
|---|---|
| O projeto está dentro de uma subpasta | "Não mova nenhum arquivo. Crie tudo na pasta onde está o package.json." |
| Não existe Git | Aceite iniciar um Git **local**, para ter pontos de restauração. Antes do primeiro commit, peça para conferir que o `.gitignore` exclui `.env`, `node_modules` e `dist`. Nunca envie para a internet |
| Há uma ferramenta já conectada ao seu banco real, com token | "Não use essa ferramenta para alterar nada: sem SQL de escrita e sem migrações" |
| O projeto não tem testes | Deixe a Etapa 4 para depois: sem testes, é difícil saber se algo quebrou |
| Existe uma skill antiga numa pasta `.agent` | Deixe como está: o Antigravity ainda a lê. Só mova se for necessário |
| O agente pede para instalar RTK ou Graphify | Opcional. Se não entendeu, diga não por enquanto |
| Você não entendeu uma pergunta | "Explique melhor e dê a sua recomendação" |
| Há arquivos em `.agents/workflows` | Eles deixam de funcionar em 19/10/2026; a Etapa 2 converte para skills |

## 10. Permissões: o que aprovar e o que negar

O Antigravity pede permissão antes de rodar comandos. Leia o comando antes de aprovar.

| Pode aprovar | Negue e pergunte |
|---|---|
| Listar ou ler arquivos | Instalar algo no computador inteiro (`-g` ou "global") |
| `git status`, `git log` | Apagar arquivos ou pastas |
| `npm run lint`, `npm test`, `npm run build` | `git push` ou qualquer envio para a internet |
| `npm install` na cópia, se o projeto precisar | Comandos que baixam e executam um script direto da internet |
| | Qualquer coisa que use chaves reais ou mexa em produção |

## 11. Conferir o que mudou

Ao final de cada etapa, o agente deve listar os arquivos que criou ou alterou. Na Etapa 1, o esperado é **nenhum** (no máximo pastas de resultado de build, como `dist`). Para conferir por conta própria, abra a pasta do projeto no Explorador de Arquivos e ordene por **Data de modificação**: o que mudou hoje aparece no topo. Se você usa Git, o comando `git status` mostra a mesma lista.

## 12. Se algo der errado

| O que aconteceu | O que fazer |
|---|---|
| O agente diz que não acha um arquivo do toolkit | O toolkit está incompleto: refaça o passo 3 e confira os três arquivos |
| O agente não consegue ler o toolkit | Libere só a pasta do toolkit; se persistir, use a subpasta `_toolkit` |
| A conversa ficou lenta ou travou | Abra uma conversa nova (depois da Etapa 2) e diga: "Continue a partir do docs/setup.md" |
| Algo foi alterado e você não queria | Pare, não tente consertar. Restaure a pasta da cópia (ou use `git restore`, se usa Git) |
| O agente pediu uma senha ou chave | Não cole no chat. Coloque no arquivo `.env`, que fica só no seu computador |
| O projeto parou de compilar | Peça: "Desfaça apenas as suas últimas alterações e explique o que deu errado" |
| Você ficou inseguro | Pare na etapa atual. As Etapas 1 e 2 já entregam valor sozinhas |

## 13. Usar em outro projeto

1. Faça a cópia da pasta do novo projeto.
2. Abra a pasta correta no Antigravity (a que tem o arquivo principal do projeto).
3. Cole a mensagem padrão com `N` = 1 e leia o relatório.
4. Responda às perguntas, aprove e siga para a Etapa 2.
5. Decida o resto com calma. Você não precisa repetir o passo 3 (o toolkit já está no computador).

## 14. Usar pelo GitHub, em vez da pasta (opcional)

Se o toolkit estiver publicado no GitHub **como repositório público**, o agente pode lê-lo pela internet, sem você ter a pasta baixada. Troque a primeira linha da mensagem padrão por:

```text
Leia https://raw.githubusercontent.com/The-ronner/vibe-coding-toolkit-antigravity/main/docs/prompts/15-antigravity-existing-project-setup.md e execute somente o bloco da Etapa N neste projeto.
```

Antes de usar, abra esse mesmo endereço no navegador: se aparecer o texto do prompt, está funcionando. Se aparecer "404", o repositório está privado, o nome está errado ou a branch não se chama `main`. O resto da mensagem (as regras) continua igual. Na dúvida, use a pasta local, que não depende da internet.

## 15. O que já foi testado e os limites

- A **Etapa 1** foi executada num projeto real (Windows, Antigravity IDE) e funcionou como descrito. As **Etapas 2 a 5** ainda não foram observadas por este repositório.
- O Antigravity muda rápido (menus, caminhos, modelos). Quando algo no seu programa for diferente do descrito aqui, vale mais o que o programa mostra. O [guia técnico](tools/23-antigravity-workflow.md) lista as fontes oficiais.
- Nenhuma etapa publica o seu projeto. Se uma etapa pedir isso, diga não.
- Este guia complementa, e não substitui, a leitura do relatório de cada etapa: as decisões são suas.

Para o passo a passo técnico do mesmo processo em projetos que já têm tudo configurado, veja o [prompt 12](prompts/12-existing-project-setup.md). Para o Context7 no Antigravity, veja o [template de MCP](../templates/project/antigravity.mcp_config.json.example) e o [guia do Context7](tools/12-context7.md).
