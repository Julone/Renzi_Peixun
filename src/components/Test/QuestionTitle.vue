   <template #label>
       <p>
           {{el.tmSort}}: {{el.tmName}}
           <span>({{el.tmfz}}分)</span>
       </p>
   </template>
   <script>
       export default {
           props: ['el']
       }
   </script>