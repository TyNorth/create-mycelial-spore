# **create-mycelial-spore**

A Command-Line Interface (CLI) for scaffolding new spore projects for the Mycelial Framework.

## **What It Does**

This tool automates the entire process of creating a new, independent micro-application ("Spore"). It creates a new project directory and populates it with all the necessary boilerplate, including a pre-configured Vite build process, a sample Vue component, and the required main.js and contract.js files.

This allows developers to start building a new spore in seconds, without worrying about the underlying configuration.

## **Usage**

### **Creating a New Spore**

To create a new spore, run the following command in your terminal:

npm create mycelial-spore

The tool will launch an interactive wizard that will ask you for the following information:

* **Spore Name:** The name of the project folder (e.g., spore-task-list).  
* **Development Port:** The port its preview server will run on (e.g., 5178).  
* **Global Variable Name:** The unique name it will use to attach itself to the window object (e.g., SporeTaskList).

The CLI will then create the project, and you can follow the on-screen instructions to get started.

### **Local Development of the CLI**

If you are working on the CLI tool itself, you can test it locally without publishing to npm.

1. **Navigate to the create-mycelial-spore directory.**  
2. **Link the package:** This makes the command globally available on your machine, pointing to your local source code.  
   npm link

3. **Run the command:** You can now run the command from any directory.  
   create-mycelial-spore  
