# Installation
`npm i -g https://github.com/brandolori/xrm-typegen.git`  
`npm i -g .`

# Usage
Launch these commands your "WebResource" main folder
`xrm-typegen --init` generate all the files needed for the type system.   
`xrm-typegen <entity-id>` generate the typings for the specified entity in the current folder.
`xrm-typegen` without any arguments to update all the synchronized entities definitions.

# Development pipeline
1. Add feature
2. Bump version
3. Build
4. Install globally
5. Test
6. Push
7. Init in the desired projects
