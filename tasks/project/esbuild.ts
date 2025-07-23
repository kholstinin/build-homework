import esbuild from 'esbuild';

const options = {

}

esbuild.build(options).catch(() => process.exit(1))
