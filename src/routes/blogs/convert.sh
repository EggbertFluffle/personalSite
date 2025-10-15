#! /bin/bash

pandoc *.md | sed s/{/\{\"{\"\}/g > +page.svelte
