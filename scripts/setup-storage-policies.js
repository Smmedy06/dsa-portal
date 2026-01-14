/**
 * Script to set up storage bucket policies via Supabase Management API
 * 
 * Usage:
 *   node scripts/setup-storage-policies.js
 * 
 * Requires SUPABASE_SERVICE_ROLE_KEY environment variable
 */

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://agtzjfzxwyjwxpxkvwuc.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required');
  console.log('\nTo get your service role key:');
  console.log('1. Go to Supabase Dashboard > Settings > API');
  console.log('2. Copy the "service_role" key (keep it secret!)');
  console.log('3. Run: export SUPABASE_SERVICE_ROLE_KEY="your-key-here"');
  console.log('   Or on Windows: set SUPABASE_SERVICE_ROLE_KEY=your-key-here');
  process.exit(1);
}

const policies = [
  // Labs bucket
  { name: 'Public read labs', bucket: 'labs', operation: 'SELECT', definition: 'true' },
  { name: 'Admin insert labs', bucket: 'labs', operation: 'INSERT', definition: 'public.is_admin(auth.uid())' },
  { name: 'Admin update labs', bucket: 'labs', operation: 'UPDATE', definition: 'public.is_admin(auth.uid())' },
  { name: 'Admin delete labs', bucket: 'labs', operation: 'DELETE', definition: 'public.is_admin(auth.uid())' },
  
  // Assignments bucket
  { name: 'Public read assignments', bucket: 'assignments', operation: 'SELECT', definition: 'true' },
  { name: 'Admin insert assignments', bucket: 'assignments', operation: 'INSERT', definition: 'public.is_admin(auth.uid())' },
  { name: 'Admin update assignments', bucket: 'assignments', operation: 'UPDATE', definition: 'public.is_admin(auth.uid())' },
  { name: 'Admin delete assignments', bucket: 'assignments', operation: 'DELETE', definition: 'public.is_admin(auth.uid())' },
  
  // Quizzes bucket
  { name: 'Public read quizzes', bucket: 'quizzes', operation: 'SELECT', definition: 'true' },
  { name: 'Admin insert quizzes', bucket: 'quizzes', operation: 'INSERT', definition: 'public.is_admin(auth.uid())' },
  { name: 'Admin update quizzes', bucket: 'quizzes', operation: 'UPDATE', definition: 'public.is_admin(auth.uid())' },
  { name: 'Admin delete quizzes', bucket: 'quizzes', operation: 'DELETE', definition: 'public.is_admin(auth.uid())' },
];

async function createPolicy(policy) {
  const url = `${SUPABASE_URL}/rest/v1/storage/policies`;
  
  const body = {
    name: policy.name,
    bucket_id: policy.bucket,
    operation: policy.operation,
    definition: policy.definition,
    check: policy.operation === 'INSERT' || policy.operation === 'UPDATE' ? policy.definition : null,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      console.log(`✅ Created policy: ${policy.name}`);
      return true;
    } else {
      const error = await response.text();
      if (error.includes('already exists') || error.includes('duplicate')) {
        console.log(`⚠️  Policy already exists: ${policy.name}`);
        return true;
      }
      console.error(`❌ Failed to create ${policy.name}:`, error);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error creating ${policy.name}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Setting up storage bucket policies...\n');
  
  let successCount = 0;
  let failCount = 0;

  for (const policy of policies) {
    const success = await createPolicy(policy);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n📊 Summary: ${successCount} succeeded, ${failCount} failed`);
  
  if (failCount === 0) {
    console.log('✅ All storage policies created successfully!');
  } else {
    console.log('⚠️  Some policies failed. You may need to create them manually in the dashboard.');
  }
}

main().catch(console.error);
